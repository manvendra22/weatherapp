import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        width={'100%'}
        height={400}
    >
        <rect x="0" y="0" rx="5" ry="5" width="150" height="10" />
        <rect x="0" y="20" rx="5" ry="5" width="150" height="10" />
        <rect x="0" y="40" rx="5" ry="5" width="150" height="10" />
        <rect x="0" y="80" rx="5" ry="5" width="100%" height="150" />
        <rect x="0" y="260" rx="5" ry="5" width="100%" height="50" />
        <rect x="0" y="340" rx="5" ry="5" width="100%" height="50" />
        {/* <rect x="0" y="400" rx="5" ry="5" width="100%" height="150" /> */}
    </ContentLoader>
)

export default Loader