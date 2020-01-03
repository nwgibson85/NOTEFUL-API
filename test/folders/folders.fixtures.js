function makeMaliciousFoldersArray() {
    return [
        {
            id: 1,
            name: 'Furry bois', 
        },
        {
            id: 2,
            name: 'Winged', 
        },
        {
            id: 3,
            name: 'Castle wall', 
        },
    ]
}

function makeMaliciousFolder() {
    const maliciousFolder = {
      id: 911,
      name: 'Naughty naughty very naughty <script>alert("xss");</script>',
    }
    const expectedFolder = {
      ...maliciousFolder,
      name: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    }
    return {
      maliciousFolder,
      expectedFolder,
    }
  }

module.exports = {
    makeMaliciousFoldersArray,
    makeMaliciousFolder,
}