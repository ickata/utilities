/**
 * CSSStyleSheet.prototype.insertRule
 *
 * Creates new CSS rule ( selector { cssprop: cssvalue } )
 *
 * @param rule {String} The CSS rule to insert
 *
 * @returns {Number} The new rule's index
**/
! CSSStyleSheet.prototype.insertRule && (CSSStyleSheet.prototype.insertRule = function ( rule, index ) {
   if ( this.addRule ) {
      // extract the selector
      var selector   = rule.substring( 0, rule.indexOf('{') );
      // now extraxt the selector body
      var style      = rule.substring( rule.indexOf('{') + 1, rule.lastIndexOf('}') );
      // insert the rule!
      return this.addRule( selector, style, index );
   }
   return -1;
});

/**
 * CSSStyleSheet.prototype.deleteRule
 *
 * Removes a CSS rule from a stylesheet by specified index
 *
 * @param index {Number} The CSS rule's index
 *
 * @returns {Boolean}
**/
! CSSStyleSheet.prototype.deleteRule && (CSSStyleSheet.prototype.deleteRule = function ( index ) {
   return this.removeRule ? this.removeRule( index ) : false;
});

/**
 * CSSStyleSheet.prototype.cssRules
 *
 * Standardize `cssRules` property
**/
! document.styleSheets[0].cssRules && Object.defineProperty( CSSStyleSheet.prototype, 'cssRules', {
   enumerable     : false,
   configurable   : true,
   
   get : function () {
      return this.rules;
   }
   
});

'styleSheet' in document.createElement('style') && (

/**
 * HTMLStyleElement.prototype.sheet
 *
 * Standardize `sheet` property
**/
Object.defineProperty( HTMLStyleElement.prototype, 'sheet', {
   
   enumerable     : false,
   configurable   : true,
   
   get : function () {
      return this.styleSheet;
   }
   
}),

/**
 * HTMLStyleElement.prototype.innerHTML
 *
 * Standardize `innerHTML` property
**/
Object.defineProperty( HTMLStyleElement.prototype, 'innerHTML', {
   
   enumerable     : false,
   configurable   : true,
   
   get : function () {
      return this.sheet.cssText;
   },
   
   set : function ( value ) {
      this.sheet.cssText = value;
   }
   
})
);