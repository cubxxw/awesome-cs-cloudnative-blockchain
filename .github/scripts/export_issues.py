#!/usr/bin/env python3
"""Export the repository's readable issues and comments with the runner's gh CLI."""
import argparse
import json
import os
from pathlib import Path
import subprocess
import sys


def read_pages(endpoint):
    result = subprocess.run(
        ['gh', 'api', '--paginate', '--slurp', endpoint],
        check=True, capture_output=True, text=True, encoding='utf-8',
    )
    pages = json.loads(result.stdout)
    if not isinstance(pages, list) or any(not isinstance(page, list) for page in pages):
        raise ValueError('Expected GitHub API array pages')
    records = [record for page in pages for record in page]
    if any(not isinstance(record, dict) for record in records):
        raise ValueError('Expected GitHub API object records')
    return records


def author(record):
    return (record.get('user') or {}).get('login') or 'ghost'


def export(repo, output):
    issues = read_pages(f'repos/{repo}/issues?state=all&per_page=100')
    output = Path(output)
    count = 0
    for issue in issues:
        if 'pull_request' in issue:
            continue
        number = issue['number']
        if type(number) is not int or number <= 0:
            raise ValueError('Expected a positive issue number')
        comments = (read_pages(f'repos/{repo}/issues/{number}/comments?per_page=100')
                    if issue.get('comments', 0) else [])
        labels = ', '.join(label['name'] for label in issue.get('labels', []))
        content = (
            f"# Issue {number}: {issue['title']}\n\n"
            f"Author **{author(issue)}** at *{issue['created_at']}*\n\n"
            f"Labels: {labels}\n\nState: {issue['state'].upper()}\n\n---\n\n"
            f"{issue.get('body') or ''}\n\n## Comments\n\n---\n\n"
        )
        for comment in comments:
            content += (f"**{author(comment)}** at *{comment['created_at']}*\n\n"
                        f"{comment.get('body') or ''}\n\n---\n\n")
        output.mkdir(parents=True, exist_ok=True)
        (output / f'issue-{number}.md').write_text(content, encoding='utf-8')
        count += 1
    return count


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo', default=os.environ.get('GITHUB_REPOSITORY'))
    parser.add_argument('--output', default='issues')
    args = parser.parse_args()
    if not args.repo or len(args.repo.split('/')) != 2:
        parser.error('--repo or GITHUB_REPOSITORY must contain owner/repository')
    try:
        count = export(args.repo, args.output)
    except (subprocess.CalledProcessError, ValueError, KeyError, OSError) as error:
        print(f'Issue export failed: {error}', file=sys.stderr)
        return 1
    print(f'Exported {count} issues to {args.output}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
