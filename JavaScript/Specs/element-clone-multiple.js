describe('HTMLElement.cloneMultiple', function () {
   // Sample element to test with
   var element = document.createElement('div');
   element.innerHTML = 'Hello, world!';
   
   it('Clones the element as many times as specified', function () {
      // 1-50
      for ( var i=1; i<50; i += 1 ) {
         expect( element.cloneMultiple( i ).childNodes.length ).toEqual( i );
      }
      // large random numbers
      for ( var i=1; i<50; i += 1 ) {
         var n = Math.floor( Math.random() * 1000 ) + 100;
         expect( element.cloneMultiple( n ).childNodes.length ).toEqual( n );
      }
   });
   
   it('Clones the element only', function () {
      expect( element.cloneMultiple( 10 ).childNodes[0].childNodes.length ).toEqual( 0 );
   });
   
   it('Clones the element and its descendants', function () {
      expect( element.cloneMultiple( 10, true ).childNodes[0].childNodes.length )
            .toEqual( element.childNodes.length );
   });
});