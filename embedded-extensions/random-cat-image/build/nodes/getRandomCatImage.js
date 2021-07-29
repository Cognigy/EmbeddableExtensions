"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomCatImage = void 0;
const extension_tools_1 = require("@cognigy/extension-tools");
const axios_1 = require("axios");
exports.getRandomCatImage = extension_tools_1.createNodeDescriptor({
    type: "getRandomCatImage",
    defaultLabel: "Random Cat Image",
    preview: {
        key: "cognigytext",
        type: "text"
    },
    tokens: [
        {
            label: "catImageUrl",
            script: "input.catImage[0].url",
            type: "answer"
        },
    ],
    appearance: {
        color: "#fc92e5"
    },
    function: async ({ cognigy, config }) => {
        const { api } = cognigy;
        try {
            const response = await axios_1.default({
                method: 'get',
                url: 'https://api.thecatapi.com/v1/images/search',
            });
            api.output(null, {
                "data": "",
                "linear": false,
                "loop": false,
                "text": [],
                "type": "image",
                "_cognigy": {
                    "_default": {
                        "_image": {
                            "type": "image",
                            "imageUrl": response.data[0].url
                        },
                        "fallbackText": "Great bread stapled to a tree"
                    }
                },
                "_data": {
                    "_cognigy": {
                        "_default": {
                            "_image": {
                                "type": "image",
                                "imageUrl": response.data[0].url
                            },
                            "fallbackText": "Great bread stapled to a tree"
                        }
                    }
                }
            });
            api.addToContext('catImage', response.data[0].url, 'simple');
        }
        catch (error) {
            throw new Error(error);
        }
    }
});
//# sourceMappingURL=getRandomCatImage.js.map