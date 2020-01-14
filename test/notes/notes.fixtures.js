function makeMaliciousNotesArray() {
    return [
        {
            id: 1,
            name: 'dogs', 
            modified: '2029-01-22T16:28:32.615Z',
            content: '4 legs, loyal, good boi', 
            folder_id: '1' 
            
        },
        {
            id: 2,
            name: 'cats', 
            modified: '2029-01-22T16:28:32.615Z',
            content: '4 legs, not loyal, athhole', 
            folder_id: '1'
        },
        {
            id: 3,
            name: 'birds', 
            modified: '2029-01-22T16:28:32.615Z',
            content: '2 legs, loud, fly boi', 
            folder_id: '2'
        },
        {
            id: 4,
            name: 'armadillo', 
            modified: '2029-01-22T16:28:32.615Z',
            content: '4 legs, defensive, armored boi', 
            folder_id: '3'
        },
    ]
}

function makeMaliciousNote() {
    const maliciousNote = {
      id: 911,
      name: 'Naughty naughty very naughty <script>alert("xss");</script>',
      modified: '2029-01-22T16:28:32.615Z',
      content: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
      folder_id: 1
    }
    const expectedNote = {
      ...maliciousNote,
      name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
      content: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
      folder_id: 1
    }
    return {
      maliciousNote,
      expectedNote,
    }
  }

module.exports = {
    makeMaliciousNotesArray,
    makeMaliciousNote,
}