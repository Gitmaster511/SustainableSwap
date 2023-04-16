# Please don't try to steal my api keys, I'm pretty sure I stripped all of them but still

SustainableSwap is a revolutionary online e-commerce platform that aims to combat the ever-growing problem of electronic waste, also known as e-waste. E-waste is a significant contributor to environmental pollution, and it is estimated that by 2050, the world will generate over 120 million metric tons of e-waste annually. This alarming statistic is why SustainableSwap was created.

SustainableSwap allows users to sell spare parts that would otherwise be discarded in a landfill. These spare parts can come from various electronic devices, such as phones, computers, and tablets. By selling these spare parts, users can earn money while also doing their part to reduce e-waste and contribute to a more sustainable future.

The SustainableSwap platform is built using the latest technology, including React Native and Firebase. The use of these technologies ensures that the platform is fast, reliable, and secure. The platform allows users to easily upload spare parts and add important information such as device name, parts, notes, price, condition, type, latitude, and longitude. This information is used to help potential buyers find the parts they need quickly and easily.

In addition to being a marketplace for spare parts, SustainableSwap also provides valuable resources and information to educate users about e-waste and the impact it has on the environment. The platform also aims to raise awareness about the importance of sustainability and encourages users to take an active role in reducing e-waste.

SustainableSwap is more than just an online marketplace; it's a movement towards a more sustainable future. Join us today and be a part of the solution to combat e-waste and protect our environment.

# Pages Description:

## Repair Shops:

This page uses the Google Maps API to fetch all the electronic repair shops within a 5000 meter radius of the user's current location. This information is then displayed on a map along with additional information about each shop, such as its name, address, and phone number. This page allows users to easily locate nearby repair shops and gather relevant information about them, making it a convenient tool for those in need of electronic repair services. The map interface provides a visual representation of the shops' locations, helping users to easily navigate to their desired destination.

## Check:

Our "Value Your Device" page allows users to determine the value of their electronic device by inputting its components and condition. The page uses an algorithm to provide an estimated value based on current market trends. Additionally, users can check how many people are currently searching for that particular device, providing a more accurate valuation. This page is designed to help users make informed decisions when selling or trading in their electronic devices.

## Upload:

The upload screen of our app allows users to submit information about their devices and upload images of it. Once the user fills in the device information such as device name, parts, notes, price, condition, type, and location (latitude and longitude), the user can upload images of the device. The images are uploaded to Firebase Storage, which is a cloud-based storage system that can store and serve user-generated content, such as images and videos. The rest of the device information is stored in Firebase Firestore, which is a NoSQL document database hosted by Google. Firestore allows for real-time synchronization of data between clients and servers, making it easy for users to access and update their device information from multiple devices. By using these two Firebase services together, we are able to provide a seamless and efficient uploading process for our users.

## Buy

The Buy page in our app displays a list of devices that people are looking to sell. Each device is represented by a card that displays its image, device name, and asking price. Users can scroll through the list and click on a card to view more information about the device, such as its condition, location, and parts included. This information is pulled from our Firestore database, which is a NoSQL database hosted by Google. If the user is interested in purchasing the device, they can contact the seller directly through the app. Our app provides a convenient way for users to browse and purchase electronic devices from other individuals in their local area.

## Sell:

The sell page of our app allows users to list their electronic devices for sale. To sell a device, the user must fill out a form that includes details such as the device name, parts, notes, price, condition, type, latitude, longitude, and images. Once the form is completed, the user can upload their images to a Firebase database and the rest of the information to a Firestore database. The listed devices are then displayed on the buy page, where other users can browse through the available devices. When a user clicks on a device, they are taken to a new page with more detailed information about the device, including the seller's contact information. This feature provides a convenient platform for users to sell their devices to others within their community.

#To run

First, install exop and react native

```
This part might take some time so navigate to this https://docs.expo.dev/get-started/installation/ and look around
```

First, git clone the repo

```
git clone ...
```

Then navigate to the route directory and npm install to install all the packages

```
cd SustainableSwap && npm install
```

Finally, fill in your api keys and deploy!

```
Get your api key from openai, firebase and Google maps and enjoy!
```

**License:** This work is licensed under a [Creative Commons Attribution-NoDerivatives 4.0 International License](https://creativecommons
