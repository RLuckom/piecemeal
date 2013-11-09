YUI({ logInclude: { TestRunner: true } }).use('test', 'test-console',
  function (Y) {
        // Test is available and ready for use. Add implementation
        // code here.
    var testCase = new Y.Test.Case({
      setUp: function() {
          var s = ('<div style="height: 300px; width: 100%; background: '
                   + 'red;"></div>');
          this.divs = [$(s), s, s, $(s)];
        },
      testInit: function() {
          var my = this;
          var p = new Piecemeal('body', my.divs);
          Y.Assert.areSame(1, 1, 'seems that way.');
      }
    });
    Y.Test.Runner.add(testCase);
    (new Y.Test.Console({newestOnTop: false})).render('#log');
    Y.Test.Runner.run();
});
