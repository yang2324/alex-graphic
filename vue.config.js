module.exports = {
	configureWebpack: {
	    resolve:{
	      extensions:[],
	      alias:{
	        'pages':'@/pages',
	        'components':'@/components'
	      }
	    }
	  }
}