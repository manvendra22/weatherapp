import React from "react"
import ContentLoader from "react-content-loader"

const Loader = () => (
    <ContentLoader
        width={'100%'}
        height={102}
        backgroundColor="var(--color-backgroundColor)"
        foregroundColor="var(--color-foregroundColor)"
    >
        <rect x="20" y="0" rx="5" ry="5" width="72" height="102" />
        <rect x="110" y="0" rx="5" ry="5" width="72" height="102" />
        <rect x="200" y="0" rx="5" ry="5" width="72" height="102" />
        <rect x="290" y="0" rx="5" ry="5" width="72" height="102" />
        <rect x="380" y="0" rx="5" ry="5" width="72" height="102" />
        <rect x="470" y="0" rx="5" ry="5" width="72" height="102" />
        <rect x="560" y="0" rx="5" ry="5" width="72" height="102" />
        <rect x="650" y="0" rx="5" ry="5" width="72" height="102" />
    </ContentLoader>
)

export default Loader