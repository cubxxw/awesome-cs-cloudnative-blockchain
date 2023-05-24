package main

import (
    "bufio"
    "fmt"
    _ "io/ioutil"
    "os"
    "path/filepath"
    _ "regexp"
)

func main() {
    markdownFiles, err := filepath.Glob("*.md")
    if err != nil {
        fmt.Println(err)
        return
    }

    for _, filename := range markdownFiles {
        file, err := os.Open(filename)
        if err != nil {
            fmt.Println(err)
            continue
        }
        defer file.Close()

        scanner := bufio.NewScanner(file)
        var title string
        for scanner.Scan() {
            line := scanner.Text()
            if len(line) > 2 && line[0] == '#' && line[1] == ' ' {
                title = line[2:]
                break
            }
        }

        if title == "" {
            fmt.Printf("No title found in %s\n", filename)
            continue
        }

        newFilename := title + ".md"
        if newFilename == filename {
            fmt.Printf("%s is already named correctly\n", filename)
            continue
        }

        if err := os.Rename(filename, newFilename); err != nil {
            fmt.Printf("Error renaming %s to %s: %s\n", filename, newFilename, err)
            continue
        }

        fmt.Printf("Renamed %s to %s\n", filename, newFilename)
    }
}