import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        width={'100%'}
        height={380}
    >
        <rect x="0" y="0" rx="5" ry="5" width="150" height="10" />
        <rect x="0" y="20" rx="5" ry="5" width="150" height="10" />
        <rect x="0" y="60" rx="5" ry="5" width="100%" height="150" />
        <rect x="0" y="240" rx="5" ry="5" width="150" height="60" />
        <rect x="200" y="240" rx="5" ry="5" width="150" height="60" />
        <rect x="0" y="320" rx="5" ry="5" width="100" height="60" />
        <rect x="240" y="320" rx="5" ry="5" width="100" height="60" />
        {/* <rect x="0" y="320" rx="5" ry="5" width="100%" height="150" /> */}
    </ContentLoader>
)

export default Loader