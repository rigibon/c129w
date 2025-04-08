## TranslationController

### Endpoints

#### 1. POST /translate/upload
**Description**: Uploads files and moves them to a specific directory based on the provided directory parameter in the request body.

**Example Request**:
```json
{
  "directory": "creative",
  "files": [ /* file data */ ]
}
```

#### 2. POST /translate/survey
**Description**: Generates survey questions tailored to a specific brand and product using Google's Generative AI (Gemini).

**Example Request**:
```json
{
  "brand": "Walmart",
  "product": "Dexter Tool Set"
}
```

## Survey Controller

### Endpoints

#### 1. POST /survey/build
**Description**: Builds a survey using product, brand, and configuration data, then generates a downloadable ZIP file in /client folder.

**Example Request**:
```json
{
  "product": { 
    "product": "Dexter Tool Set", 
    "description": "Dexter Tool Set Description", 
    "price": "159.99", 
    "productImage": "dextoolset.png", 
    "commentImage1": "comm_1.png", 
    "commentImage2": "comm_2.png" 
  },
  "brand": { 
    "name": "Walmart", 
    "brandLogo": "wal_logo.png", 
    "backgroundImage": "wal_bg.png", 
    "favicon": "wal_fav.png", 
    "mainColor": "rgb(12,12,12)", 
    "secondaryColor": "rgb(0,0,0)", 
    "headerColor": "rgb(255, 255, 255)" 
  },
  "survey": `'How often do you visit CVS for your shopping needs?', 'Multiple times a week', 'Once a week', 'A few times a month', 'Rarely or never'`,
  "config": {
    "templateName": "tryetco",
    "folderName": "es-dexts",
    "language": "spanish",
    "geo": "es",
    "langTag": "es",
    "currency": "€"
  }
}
```

## Creative Controller

### Endpoints

#### 1. POST /creative/generate
**Description**: Generates multiple creative HTML files from templates with translations and packages them as a downloadable ZIP file in /client folder.

**Example Request**:
```json
{
  "product": {
    "product": "productName",
    "productImage": "image.jpg",
    "commentImage1": "comment1.jpg",
    "commentImage2": "comment2.jpg"
  },
  "brand": {
    "name": "brandName",
    "mainColor": "rgb(12,12,12)",
    "secondaryColor": "rgb(0,0,0)",
    "brandLogo": "logo.png"
  },
  "config": {
    "language": "spanish"
  }
}
```

## Brands Service

### Endpoints

#### 1. POST /brands/suggestions
**Description**: Retrieves brand suggestions based on a product and geographical region.

**Example Request**:
```json
{
  "product": "Tool Set",
  "geo": "us"
}
```

**Response**:
```json
{
  "message": { "suggested_brands": [ { "brand": "Brand 1", "matching_percentage": 100 }, { "brand": "Brand 2", "matching_percentage": 85 }] }
}
```