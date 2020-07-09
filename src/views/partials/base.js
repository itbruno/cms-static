import React from "react";
import SEO from "./seo";

const Base = ({ children }) => {
    return (
        <>
            <SEO />
            <main>{ children }</main>
        </>
    )
}

export default Base;
