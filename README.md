# Search_Ads Browser Extension

Browser extension that can identify ads in serach result

# How does work

1. Change background color of ads in serach result to red color
2.  Append in 2021 to all search
3.  count number of ads in search tab


# How to load

1. Git clone: https://github.com/MahamatTech/Search_Ads.git
2. Go to Chrome extension and load app directory from Search_ad_extension 
3. Enable and pin the extension

# Time to Test :)

1. Go to google.com and serach any page that will show ads in it, it will show ads in red color
2. open the popup and you will see the ad numbers


# Design 

1. Used https://github.com/mozilla/webextension-polyfill in order to be compatible with browsres


2. used https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/sendMessage api for the extension popup to communicate with content script to counts ads.

  - identify serach result, ahving ads in DOM through content script
  

3. used https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webNavigation/onBeforeNavigate api to increase the serach query and update the query with in 2021


# Testing

I am not getting the result that I want, I am having some difficulty to test other browser extension, that's wht I used only google

 


