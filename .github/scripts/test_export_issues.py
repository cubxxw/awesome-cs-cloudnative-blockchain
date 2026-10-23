"""Exercise the real exporter process with an isolated local gh executable."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

SCRIPT = Path(__file__).with_name('export_issues.py')
STUB = r'''#!/usr/bin/python3
import json, os, sys
args = sys.argv[1:]
if len(args) != 4 or args[:3] != ['api', '--paginate', '--slurp']:
    sys.exit(91)
with open(os.environ['EXPORT_FIXTURE_LOG'], 'a') as log:
    log.write(json.dumps(args) + '\n')
mode = os.environ['EXPORT_FIXTURE_MODE']
endpoint = args[3]
if mode == 'api-failure':
    sys.exit(7)
if mode == 'malformed':
    print('{invalid JSON')
    sys.exit(0)
if mode == 'empty':
    print('[[]]')
    sys.exit(0)
if endpoint == 'repos/fixture/repo/issues?state=all&per_page=100':
    base = {'title': '中文 issue', 'created_at': '2026-10-22T00:00:00Z', 'state': 'closed', 'body': None, 'user': None, 'labels': [{'name': 'documentation'}]}
    print(json.dumps([[dict(base, number=1, comments=2), dict(base, number=3, comments=0, pull_request={})], [dict(base, number=2, comments=0, body='Second issue')]]))
elif endpoint == 'repos/fixture/repo/issues/1/comments?per_page=100':
    if mode == 'comment-failure':
        sys.exit(8)
    print(json.dumps([[{'user': None, 'body': 'First comment', 'created_at': '2026-10-22T01:00:00Z'}], [{'user': {'login': 'reader'}, 'body': '第二条评论', 'created_at': '2026-10-22T02:00:00Z'}]]))
else:
    sys.exit(92)
'''


class ExportIssuesTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix='export-issues-test-')
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        binaries = self.root / 'bin'
        binaries.mkdir()
        gh = binaries / 'gh'
        gh.write_text(STUB)
        gh.chmod(0o755)
        self.output = self.root / 'issues'
        self.log = self.root / 'calls.jsonl'
        self.environment = {
            'PATH': str(binaries) + os.pathsep + '/usr/bin:/bin',
            'LC_ALL': 'C.UTF-8', 'GITHUB_REPOSITORY': 'fixture/repo',
            'GH_TOKEN': 'synthetic-fixture-only',
            'EXPORT_FIXTURE_LOG': str(self.log),
        }

    def run_export(self, mode):
        return subprocess.run(
            [sys.executable, str(SCRIPT), '--output', str(self.output)],
            env={**self.environment, 'EXPORT_FIXTURE_MODE': mode},
            capture_output=True, text=True, timeout=10,
        )

    def test_issues_comments_unicode_and_deleted_authors(self):
        result = self.run_export('success')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(sorted(p.name for p in self.output.iterdir()), ['issue-1.md', 'issue-2.md'])
        content = (self.output / 'issue-1.md').read_text()
        for expected in ['中文 issue', '**ghost**', 'State: CLOSED', 'documentation', 'First comment', '第二条评论', '**reader**']:
            self.assertIn(expected, content)
        self.assertEqual(len(self.log.read_text().splitlines()), 2)
        self.assertIn('Exported 2 issues', result.stdout)

    def test_empty_repository_is_a_successful_empty_export(self):
        result = self.run_export('empty')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertIn('Exported 0 issues', result.stdout)
        self.assertFalse(self.output.exists())

    def test_api_failure_is_not_a_successful_empty_export(self):
        result = self.run_export('api-failure')
        self.assertEqual(result.returncode, 1)
        self.assertFalse(self.output.exists())

    def test_comment_failure_blocks_artifact_success(self):
        result = self.run_export('comment-failure')
        self.assertEqual(result.returncode, 1)
        self.assertFalse(self.output.exists())

    def test_malformed_api_output_is_rejected(self):
        result = self.run_export('malformed')
        self.assertEqual(result.returncode, 1)
        self.assertFalse(self.output.exists())

    def test_repository_context_is_required_before_calling_gh(self):
        self.environment.pop('GITHUB_REPOSITORY')
        result = self.run_export('success')
        self.assertEqual(result.returncode, 2)
        self.assertFalse(self.log.exists())


if __name__ == '__main__':
    unittest.main()
