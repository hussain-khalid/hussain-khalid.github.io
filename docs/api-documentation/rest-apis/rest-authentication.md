---
sidebar_position: 1
title: Authentication
description: Learn how to authenticate requests to the Agora REST APIs using project credentials or tokens.
hide_table_of_contents: false
---

Before you use the Agora REST APIs, you must configure authentication. This guide explains how to authenticate requests using your Agora project credentials.

## Overview

To authenticate requests, retrieve your **Customer ID** and **Customer Secret** from the [Agora Console](https://console.agora.io/v2).  
Combine them in the format `<CustomerID>:<CustomerSecret>`, encode the string using Base64, and add it to the `Authorization` header with the prefix `Basic`.

> **Note**: Authentication credentials remain valid until you revoke them in the [Agora Console](https://console.agora.io/v2).  
You can generate multiple Customer IDs and secrets. If you lose one, delete it and create a new pair.

## Implement authentication

To set up authentication, complete the following steps:

### 1. Get your Customer ID and Customer Secret

1. In the [Agora Console](https://console.agora.io/v2), go to **Developer Toolkit** > **RESTful API**.  
2. Click **Add a Secret**. The system generates a new Customer ID and Customer Secret.  
3. In the **Customer Secret** column, click **Download**. Read the pop-up message carefully, and confirm the download.  
   A file named `key_and_secret.txt` is saved to your computer. Store this file in a secure location.

### 2. Convert credentials to a Base64 string

Concatenate your Customer ID and Customer Secret with a colon (`:`), and run the following command to generate a Base64-encoded string:

```bash
echo -n "<Your Customer ID>:<Your Customer Secret>" | base64
```

The command outputs a Base64 string. Use this encoded value in the `Authorization` header of your HTTP request.

### 3. Make your first request

The following example checks a user’s status in a channel and returns the result:

```sh
curl --request GET \
  --url https://api.sd-rtn.com/dev/v1/channel/user/property/<appID>/<userID>/channelName \
  --header "Accept: application/json" \
  --header "Authorization: Basic <Base64-encoded string>"
```

## Development considerations

In production, do not generate `Base64` strings manually.
Instead, implement authentication programmatically on your server.
The following Go example shows how to handle authentication securely:

```go
package main

import (
  "encoding/base64"
  "fmt"
  "io"
  "net/http"
  "strings"
)

func main() {
  // Replace with your Customer ID and Customer Secret
  customerID := "YOUR_CUSTOMER_ID"
  customerSecret := "YOUR_CUSTOMER_SECRET"

  // Encode credentials as Base64
  plainCredentials := customerID + ":" + customerSecret
  base64Credentials := base64.StdEncoding.EncodeToString([]byte(plainCredentials))

  url := "https://api.agora.io/dev/v2/projects"
  client := &http.Client{}
  req, err := http.NewRequest("GET", url, strings.NewReader(""))
  if err != nil {
    fmt.Println("Error creating request:", err)
    return
  }

  // Add headers
  req.Header.Add("Authorization", "Basic "+base64Credentials)
  req.Header.Add("Content-Type", "application/json")

  // Send request
  res, err := client.Do(req)
  if err != nil {
    fmt.Println("Error sending request:", err)
    return
  }
  defer res.Body.Close()

  body, err := io.ReadAll(res.Body)
  if err != nil {
    fmt.Println("Error reading response:", err)
    return
  }

  fmt.Println(string(body))
}
```
