import React from "react";
import { graphql } from "gatsby";

import Base from '../partials/base';
import SEO from '../partials/seo';

import './common.css';
import s from './styles.module.css';


export default function Alpha({ data }) {
    const { markdownRemark } = data;
    const { frontmatter } = markdownRemark;
    const { sections } = frontmatter;
    
    return (
        <Base>
            <SEO 
                title={frontmatter.title}
            />
            {/* Hero */}
            <div className={s.hero}>
                <div className="container">
                    <div className={s.nav}>
                        Header com menu
                    </div>
                </div>
                <div className="container">
                    <div className={s.heroGrid}>
                        <div>
                            <h1>{frontmatter.hero.hero_h1}</h1>
                            <p>{frontmatter.hero.hero_description}</p>
                            { 
                                frontmatter.hero.hero_cta && 
                                <a className="btn-primary" href="https://www.nuvemshop.com.br/monte-sua-loja-virtual>">Testar 30 dias gratis</a>
                            }
                        </div>
                        <div>
                            <img src={frontmatter.hero.hero_image.childImageSharp.fluid.src} alt=""/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sections */}
            <div className="sections">
                <div className="container">
                    { sections.map(el => (
                        <section className={s.section} key={el.title}>
                            <div className={s.content}>
                                <h2>{ el.title }</h2>
                                <p>{ el.description }</p>
                                { el.section_link && 
                                    <a href={el.section_link.section_link_url}>{el.section_link.section_link_label}</a>
                                }
                            </div>
                            <div className={s.image}>
                                <img src={el.section_image.childImageSharp.fluid.src} alt=""/>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </Base>
        )
    }
    
    export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug }}) {
            frontmatter {
                slug
                title
                hero { 
                    hero_h1
                    hero_description
                    hero_cta
                    hero_image {
                        childImageSharp {
                            fluid(maxWidth: 700) {
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
                            fluid(maxWidth: 800) {
                                src
                            }
                        }
                    }
                }
            }
        }
    }
    `
    