import React, { Fragment } from "react"
import { graphql } from "gatsby"

export default function Alpha({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data // data.markdownRemark holds your post data
    const { frontmatter } = markdownRemark
    const { sections } = frontmatter
    
    return (
        <div className="alpha-template">
            {/* Hero */}
            <div className="hero">
                <h1>{frontmatter.hero.hero_h1}</h1>
                <p>{frontmatter.hero.hero_description}</p>
                { 
                    frontmatter.hero.hero_cta && 
                    <a href="https://www.nuvemshop.com.br/monte-sua-loja-virtual>">Testar 30 dias gratis</a>
                }
        
                <img src={frontmatter.hero.hero_image.childImageSharp.fluid.src} alt=""/>
            </div>

            {/* Sections */}
            <div className="sections">
                { sections.map(el => (
                    <Fragment key={el.title}>
                        <h2>{ el.title }</h2>
                        <p>{ el.description }</p>
                        { el.section_link && 
                            <a href={el.section_link.section_link_url}>{el.section_link.section_link_label}</a>
                        }

                        <img src={el.section_image.childImageSharp.fluid.src} alt=""/>
                    </Fragment>
                ))}
            </div>
        </div>
        )
    }
    
    export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug }}) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                slug
                title
                hero { 
                    hero_h1
                    hero_description
                    hero_cta
                    hero_image {
                        childImageSharp {
                            fluid(maxWidth: 300) {
                                src
                            }
                        }
                    }
                }
                sections {
                    title
                    description
                    section_link {
                        section_link_label
                        section_link_url
                    }
                    section_image {
                        childImageSharp {
                            fluid(maxWidth: 200) {
                                src
                            }
                        }
                    }
                }
            }
        }
    }
    `
    