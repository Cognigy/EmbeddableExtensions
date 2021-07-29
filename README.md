

This repository contains documentation, instructions and files our on-premises customers can use if they want to embed an extension into their own build of Cognigy.AI.

<br>

# Embedded Extensions

<br>

## TL;DR
1. **Folder name** must be same as your **package.json name**
2. Add the prefix `@embedded/` to the **package.json name**
3. Set your container **REGISTRY_URL** in the build script 
4. Run the script
5. Deploy the images

<br>

## Introduction

System wide extensions are accessible organization wide and can be enabled by providing a path to a directory containing extensions. 
<br> 
Each extension must be **unpacked** including all required **node_modules**.


<br>

## 1. Naming convention

The **folder name** of the extension must have the same name as defined in the **package.json**


The **name** of the extension in **package.json** needs the additional prefix `@embedded/`

```json
// package.json
{
  "name": "@embedded/random-cat-image",  
  ...
}

// folder name:
/random-cat-image
```

<br>

## 2. Build the docker images

The extensions need to get copied into the docker images of service-ai and service-resources. 

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

<br><br>

### Build script

Before running the script adjust the `REGISTRY_URL='yourcontainerregistry.azurecr.io'`.

Run the provided build script `cognigy-build-embedded`. for **service-ai** and **service-resources**

<br>

```bash
./bin/cognigy-build-embedded <service-name> <hash>

./bin/cognigy-build-embedded service-ai my-build-1
# This results in yourcontainerregistry.azurecr.io/service-ai:embedded-extensions-my-build-1
```

```bash
./bin/cognigy-build-embedded service-resources my-build-1

# This results in yourcontainerregistry.azurecr.io/service-resources:embedded-extensions-my-build-1
```

<br>

Deploy both images to your on-premises cognigy installation.

<br>

## 4. Update config map

Set the env `FEATURE_ADDITIONAL_SYSTEM_WIDE_EXTENSIONS_PATH` in the config-map and provide the path to the extensions folder. In the case of the example above it would be `/app/embedded-extensions`.

<br><br>


