import React, { Component } from "react";

export function data(props) {
  console.log("!! data called !!");
  props.then((data) => {
    console.log(data.token);
    console.log("Token Processed");
    return data.token;
  });
}
