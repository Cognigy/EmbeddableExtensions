

Contains documentation, instructions and files our on-premise customers can use if they want to embed an extension into their own build of Cognigy.AI.

# Embedded Extensions

System wide extensions can be enabled by providing a path to a directory containing extensions. Each extension must be **unpacked** including all required **node_modules**.

## 1. Naming convention

The **folder name** of the extension must have the same name as defined in the **package.json**


The **name** of the extension in **package.json** needs the additional prefix `@embedded/`


```json
{
  "name": "@embedded/random-cat-image",  
  ...
}

folder name:
/random-cat-image
```

<br>


## 2. Build Docker Image 

Each extension needs to get copied into the docker images of:
- service-ai
- service-resources

<br> 

This can be done via the provided Dockerfiles:
 - service-ai.Dockerfile 
 - service-reources.Dockerfile

```docker
FROM cognigydevelopment.azurecr.io/service-ai:34a9dd993a1e75a75857d3080e0ddc4ca81a8517

WORKDIR /app

COPY embedded-extensions /app/embedded-extensions
```

```docker
FROM cognigydevelopment.azurecr.io/service-resources:527f57bfcdeb393d8cdc425b80e5c087a7823f24

WORKDIR /app

COPY embedded-extensions /app/embedded-extensions
``` 

<br>

<br>

### Run build script

Run the build script `cognigy-build-embedded`. for **service-ai** and **service-resources**


```bash
./bin/cognigy-build-embedded service-ai 1

# This results in yourcontainerregistry.azurecr.io/service-ai:embedded-extensions-1
```

```bash
./bin/cognigy-build-embedded service-resources 1

# This results in yourcontainerregistry.azurecr.io/service-resources:embedded-extensions-1
```

<br>

Deploy both images to your on-premises cognigy installation.



<br>

## 4. Update config map

Set the env `FEATURE_ADDITIONAL_SYSTEM_WIDE_EXTENSIONS_PATH` in the config-map and provide the path to the extensions folder. In the case of the example above it would be `/app/embedded-extensions`.

# TL;DR
1. name your folder same as your package.json
2. add the prefix @embedded/ to the package.json name
3. Set your container registry url in the script 
4. Run the script
5. Deploy the images
