(function($) {
    $.timelimit = {
        defaultOptions: {
            timeout: 1000,
            dataName: 'timelimit',
            policy: 'replace',
            args: []
        }
    };
    $.fn.timelimit = function(fn, options){
        var opts = $.extend({}, $.timelimit.defaultOptions, options);
        var self = this;
        if (!this.data(opts.dataName)) {
            this.data(opts.dataName, function() {
                fn.apply(self, opts.args);
            });
            setTimeout(function(){
                self.data(opts.dataName)();
                self.removeData(opts.dataName);
            }, opts.timeout);
        } else if (opts.policy == 'replace') {
            this.removeData(opts.dataName).data(opts.dataName, function() {
                fn.apply(self, opts.args);
            });
        } else { /* do nothing */ }
    };
})(jQuery);
