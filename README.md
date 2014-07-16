AppDataRoom-Javascript-Bridge
=============================

Javascript bridge that provides native functionality to web bundles running within App Data Room

#####Usage:

Simply include the adrJSBridge.js file and call any of the public methods.  See index.html for usage examples.

 ```javascript
 adr.sendEmail("test@gmail.com", "", "test subject", "test body", onSuccess, onError);
 ```


##Public Methods:


  
###sendEmailEncoded
  Sends an email via the platform's native mail application using base 64 encoding for the parameters
  Support: iOS v1.7.9+

#####Parameters
* to
  * (string) destination email address
* cc
  * (string) carbon copy email address
* subject
  * (string) subject of email
* body
  * (string) body of email
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error
  
###sendEmailEncodedWithAttachments
  Sends an email via the platform's native mail application using base 64 encoding for the parameters
  Support: iOS v1.7.9+


###sendEmailEncodedWithAttachments
  Sends an email via the platform's native mail application using base 64 encoding for the parameters and includes a parameter for attaching an array of attachments using their datauri.

#####Parameters
* to
  * (string) destination email address
* cc
  * (string) carbon copy email address
* subject
  * (string) subject of email
* body
  * (string) body of email
* attachments
  * (string) json array of datauri
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error

###sendEmail  **_Deprecated in v1.7.9, use sendEmailEncoded instead_**
  Sends an email via the platform's native mail application
  Support: iOS v1.7.0+, Windows v1.1+

#####Parameters
* to
  * (string) destination email address
* cc
  * (string) carbon copy email address
* subject
  * (string) subject of email
* body
  * (string) body of email
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error

###getItem
  Gets a value for a specified key from the native local database
  Support: iOS v1.7.0+

#####Parameters
* key
  * (string) key to retrieve
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error


###setItem
  Sets a value for a specified key to the native local database
  Support: iOS v1.7.0+

#####Parameters
* key
  * (string) key to store
* value
  * (string) value to store
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error


###logEvent
  Logs an event to the App Data Room analytics engine, which will then be queued to be sent up to Media Manager when a connection is available
  Support: iOS v1.7.0+

#####Parameters
* object
  * (string) object parameter of event
* action
  * (string) action parameter of event
* additionalParams
  * (string) key value pair listing of additional parameters (example: "email:test@gmail.com")
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error


###scanPDF417Barcode
  Scans a PDF 417 barcode and returns the text encoded in the barcode (encoded in base64)
  Support: iOS v1.7.2+, Cat Sales 2.1 +

#####Parameters
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error

###getCurrentUserName
  Returns the currently logged in user's name (first and last) (encoded in base64)
  Support: iOS v1.7.8+, Cat Sales 2.2 +

#####Parameters
* successCallback
  * (function) function to be called on success
* errorCallback
  * (function) function to be called on error
