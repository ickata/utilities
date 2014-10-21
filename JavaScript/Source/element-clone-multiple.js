/** 
 * @function HTMLElement.prototype.cloneMultiple
 * @public
 * 
 * Clones the HTML element as many times as specified.
 * The function uses the benefit of appending cloned elements to fragments 
 * and cloning the fragments in order to reduce the number of operations and
 * increase performance.
 * 
 * @param  {Number}  n           How many times we want the element to be cloned
 * @param  {Boolean} bool_deep   Whether to clone only the element (false) or it's descendants as well (true)
 * 
 * @returns {DocumentFragment}   Fragment containing all cloned elements
 */
(HTMLElement || Element).prototype.cloneMultiple = function ( n, bool_deep ) {
   var fragment = document.createDocumentFragment();
   fragment.appendChild( this.cloneNode( bool_deep ) );
   
   if ( n <= 1 ) {
      return fragment;
   }
   
   /** 
    * In order to reduce the number of cloning operations, we need to clone
    * the original element few times and append the clones to a document fragment,
    * and clone that fragment as many times as required. 
    * 
    * Cloning the fragment and appending the cloning to the original fragment
    * actually appends the cloned elements, and instead of cloning each element
    * from the fragment, we clone all elements with a single operation.
    * 
    * In other words - the more elements we need to clone, the less DOM operations
    * we will use.
    * 
    * See http://ejohn.org/blog/dom-documentfragments/
    * 
    * The algorithm for calculating the times we need to clone a fragment
    * is as follows:
    *    - we divide the # of desired cloned nodes to 2 unless it becomes odd
    *      number, or a simple number like 2 or 3
    *    - we count the # of operations each time we divide
    *    - when we get an odd number, we substract 1 so we get an even number,
    *      and continue division by 2; we "remember" that on this step, we need 
    *      to add +1 to the fragment with clones
    */
   var i             = 1;  // steps counter
   var steps_add_1   = []; // array remembering these steps where we need to add +1 clone
   
   // Increase the steps counter on each division until we reach a simple number
   // 2 or 3. In case of a odd number, push a truthy value to the array so we know
   // that on this step we need to increase the cloned elements in the fragment with 1.
   while ( ( !(n % 2) || !!((steps_add_1[i] = 1) && --n) ) && (n /= 2) && n > 3 ) {
      i += 1;
   }
   
   // After division operations are complete, `n` will now have a value of 2 or 3.
   // Append 1 more clone to the fragment if `n == 2`, or 2 if `n == 3`
   while ( n > 1 ) {
      fragment.appendChild( this.cloneNode( bool_deep ) );
      n -= 1;
   }
   
   // We start cloning the fragment `i` times.
   for ( ; i; i -= 1 ) {
      fragment.appendChild( fragment.cloneNode( true ) );   // that's pretty fast!
      // Check if we need to append +1 clone to the fragment on this step,
      // so at the end we get the exact number of cloned elements.
      steps_add_1[i] && fragment.appendChild( this.cloneNode( bool_deep ) );
   }
   
   return fragment;
}