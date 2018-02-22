module.exports = {
  siteMetadata: {
    title: 'Isn\'t this weird?',
    author: 'Patricio Trevino'
  },
  plugins: [
   'gatsby-plugin-catch-links',   
   'gatsby-plugin-react-helmet',
   {
     resolve: 'gatsby-source-filesystem',
     options: {
       path: `${__dirname}/src/pages`,
       name: 'pages'
     }
   },
   {
     resolve: 'gatsby-transformer-remark',
     options: {
       plugins: [
         'gatsby-remark-images',
         {
           resolve: 'gatsby-remark-copy-linked-files',
           options: {
             destinationDir: 'static'
           }
         },
         {
           resolve: 'gatsby-remark-prismjs',
           options: {

           }
         }
       ]
     }
   }
  ],
};
