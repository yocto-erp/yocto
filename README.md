# Yocto

## js-sdk

### Reference 
 - https://nx.dev/getting-started/nx-and-typescript
 - https://nx.dev/react-tutorial/08-create-libs
 - https://nx.dev/packages/react
### JS Library using for browser or react native

 - create:  nx generate @nrwl/js:library --name={libraryName} --buildable
 - create react lib: nx g @nrwl/react:lib ui
   - nx g @nrwl/react:lib ui --buildable --publishable --importPath=@yoctoerp/ui
   - nx g component {my-component} --project=ui
 - publish: nx publish ui --ver=0.0.33 --tag=latest
 - remove: nx g rm {libraryName}
