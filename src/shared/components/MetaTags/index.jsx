import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { BaseUrl } from 'configs'

const getRobotsValue = (shouldBeIndexed) => {
  return shouldBeIndexed ? 'index,follow' : 'noindex,follow'
}

const MetaTags = ({
  metaTitle,
  metaTitleSuffix,
  metaDescription,
  metaKeywords,
  canonicalPath,
  shouldBeIndexed
}) => {
  return (
    <Helmet>
      <title>{ `${metaTitle} | ${metaTitleSuffix} | Folha de Adão` }</title>
      <meta name='description' content={metaDescription} />
      <meta name='keywords' content={metaKeywords} />
      <link rel='canonical' href={`${BaseUrl}${canonicalPath}`} />
      <meta name='robots' content={getRobotsValue(shouldBeIndexed)} />
      <meta name='francosId' content='FR001' />
    </Helmet>
  )
}

MetaTags.propTypes = {
  metaTitle: PropTypes.string,
  metaTitleSuffix: PropTypes.string,
  metaDescription: PropTypes.string,
  metaKeywords: PropTypes.string,
  canonicalPath: PropTypes.string,
  shouldBeIndexed: PropTypes.bool
}

MetaTags.defaultProps = {
  metaTitle: '',
  metaTitleSuffix: '',
  metaDescription: '',
  metaKeywords: '',
  canonicalPath: '',
  shouldBeIndexed: true
}

export default React.memo(MetaTags)
