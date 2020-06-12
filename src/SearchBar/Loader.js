import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        width={'100%'}
        height={50}
    >
        <rect x="5%" y="10" rx="5" ry="5" width="90%" height="10" />
        <rect x="5%" y="30" rx="5" ry="5" width="90%" height="10" />
    </ContentLoader>
)

export default Loader