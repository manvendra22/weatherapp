import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        width={'100%'}
        height={110}
    >
        <rect x="0" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="90" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="180" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="270" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="360" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="450" y="0" rx="5" ry="5" width="75" height="110" />
        <rect x="540" y="0" rx="5" ry="5" width="75" height="110" />
    </ContentLoader>
)

export default Loader