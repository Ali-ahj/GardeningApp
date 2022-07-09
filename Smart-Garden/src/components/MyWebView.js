import React, { useState } from "react";
import WebView from "react-native-webview";

import colors from "../config/colors";
import MyActivityIndicator from "./MyActivityIndicator";

function MyWebView({ uri }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <MyActivityIndicator color={colors.white} text="Loading..." />
      )}

      <WebView source={{ uri }} onLoadEnd={() => setLoading(false)} />
    </>
  );
}

export default MyWebView;
