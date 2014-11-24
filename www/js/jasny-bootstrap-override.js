$(function() {
  $.fn.offcanvas.Constructor.prototype.hide = function (fast) {
      if (this.state !== 'slid') return

      var startEvent = $.Event('hide.bs.offcanvas')
      this.$element.trigger(startEvent)
      if (startEvent.isDefaultPrevented()) return

      this.state = 'slide-out'

      var targetSelectors = '';
      if ($(this.options.target).hasClass('canvas-slid')) {
        targetSelectors = this.options.target + ',' + this.options.target + ' .canvas-slid,';
      }
      var elements = $(targetSelectors + this.options.canvas + ',' + this.options.canvas + ' .canvas-slid');
      var placement = this.placement
      var offset = -1 * this.offset()

      var complete = function () {
        if (this.state != 'slide-out') return
        
        this.state = null
        this.placement = null
        
        this.$element.removeClass('in')
        
        elements.removeClass('canvas-sliding')
        elements.add(this.$element).add('body').each(function() {
          $(this).attr('style', $(this).data('offcanvas-style')).removeData('offcanvas-style')
        })

        this.$element.trigger('hidden.bs.offcanvas')
      }

      if (this.options.disableScrolling) this.enableScrolling()
      if (this.options.modal) this.toggleBackdrop()

      elements.removeClass('canvas-slid').addClass('canvas-sliding')
      
      setTimeout($.proxy(function() {
        this.slide(elements, offset, $.proxy(complete, this))
      }, this), 1)
    };

  $.fn.offcanvas.Constructor.prototype.offset = function (fast) {
    switch (this.placement) {
      case 'left':
      case 'right':  return this.$element.data('offset') || this.$element.outerWidth();
      case 'top':
      case 'bottom': return this.$element.data('offset') || this.$element.outerHeight();
    }    
  }
}); 

