module.exports = {
  packagerConfig: {
    icon: './packages/main/src/icns/owl.icns'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Tarmstrong95',
          name: 'armstrong-editor'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
};
