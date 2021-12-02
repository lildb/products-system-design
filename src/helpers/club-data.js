payload = {
    product_id: "1",
    results: [],
}

results: [
    style_id: 1,
    name: "forst freen and black",
    original_price: "3",
    sale_price: "0",
    default: true,
    photos: [],
    skus: {},
]

//


GET /products/:product_id/styles

{
    "product_id": "1",
    "results": [
  	{
            "style_id": 1,              
            "name": "Forest Green & Black",     // styles
            "original_price": "140",            // styles
            "sale_price": "0",                  // styles
            "default?": true,                   // styles
            "photos": [                         // photos
  			{
                    "thumbnail_url": "urlplaceholder/thumbnail.jpg",
                    "url": "urlplaceholder/style_1.jpg"
                },
  			{
                    "thumbnail_url": "urlplaceholder/number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1e.jpg"
                }
  			// ...
            ],
        "skus": {                               // skus
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            //...
            	}
    },
  {
        "style_id": 2,
        "name": "Desert Brown & Tan",
        "original_price": "140",
        "sale_price": "0",
        "default?": false,
        "photos": [
  			{
                    "thumbnail_url": "urlplal.jpg",
                    "url": "urlplaceto_number.jpg"
        }
      // ...
            ],
        "skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            //...
            	}
    },
  // ...
}







///////////////////////////////



