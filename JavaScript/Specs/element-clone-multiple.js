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
   
   var timer = {
      
      _timers  : {},
      
      start    : function ( id ) {
         this._timers[ id ] = new Date().getTime();
      },
      
      end      : function ( id ) {
         return new Date().getTime() - this._timers[ id ];
      }
   };
   
   it('Is faster than `cloneNode` for large amount of DOM nodes', function () {
      var clones_num = 20000;
      
      timer.start('cloneNode');
      for ( var i=0; i<clones_num; i += 1 ) {
         document.body.appendChild( element.cloneNode( true ) );
      }
      var time_clone_node = timer.end('cloneNode');
      
      timer.start('cloneMultiple');
      document.body.appendChild( element.cloneMultiple( clones_num, true ) );
      var time_clone_multiple = timer.end('cloneMultiple');
      
      expect( time_clone_multiple < time_clone_node ).toBeTruthy();
      
      console.log(
         '`cloneNode` finished in: ' + time_clone_node + ' miliseconds\n' +
         '`cloneMultiple` finished in: ' + time_clone_multiple + ' miliseconds'
      );
   });
});