Webruntime.define('lwc/devServerTest', ['lwc'], function (lwc) { 'use strict';

    function tmpl($api, $cmp, $slotset, $ctx) {
      const {
        t: api_text,
        h: api_element
      } = $api;
      return [api_element("p", {
        key: 0
      }, [api_text("Hello World")])];
    }

    var _tmpl = lwc.registerTemplate(tmpl);
    tmpl.stylesheets = [];
    tmpl.stylesheetTokens = {
      hostAttribute: "lwc-devServerTest_devServerTest-host",
      shadowAttribute: "lwc-devServerTest_devServerTest"
    };

    class DevServerTest extends lwc.LightningElement {}

    var devServerTest = lwc.registerComponent(DevServerTest, {
      tmpl: _tmpl
    });

    return devServerTest;

});
