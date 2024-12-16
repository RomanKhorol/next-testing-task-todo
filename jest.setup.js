import React from "react";
global.window.React = React;
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
