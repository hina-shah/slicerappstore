var midas = midas || {};
midas.slicerappstore = midas.slicerappstore || {};

var json = null;

/**
 * Renders the category of this extension as a breadcrumb bar
 */
midas.slicerappstore.renderCategory = function(category) {
    var currToken = '';
    var categories = category.split('.');
    $.each(categories, function(k, token) {
        currToken += token;
        var html = ' &gt; ';
        html += '<a class="breadcrumbLink" href="'+json.global.webroot+'/slicerappstore?category='+currToken
             + '&os=' + json.extension.os
             + '&arch=' + json.extension.arch
             + '&revision=' + json.extension.slicer_revision;
        if(json.slicerView) {
            html += '&slicerView';
        }
        html += '">';
        html += token+'</a>';
        currToken += '.';
        $('#categoryBreadcrumb').append(html);
    });
};

/**
 * Renders the screenshots for this extension. Expects a space separated list of URLs
 */
midas.slicerappstore.renderScreenshots = function(screenshots) {
  if(screenshots == '') {
      $('div.screenshots').html('There are no screenshots for this extension.');
      return;
  }
  screenshots = screenshots.split(' ');
  $.each(screenshots, function(k, url) {
      if(url != '') {
          var template = $('#screenshotTemplate').clone();
          template.removeAttr('id');
          var link = template.find('a.screenshotPreview');
          link.attr('href', url);
          var img = link.find('img.screenshotPreview');
          img.attr('src', url);
          img.attr('alt', url);
          template.appendTo('div.screenshots');
          template.show();
      }
  });
  $('div.screenshots a.screenshotPreview').lightBox({
      imageLoading: json.global.moduleWebroot+'/public/images/lightbox/lightbox-ico-loading.gif',
      imageBlank: json.global.moduleWebroot+'/public/images/lightbox/lightbox-blank.gif',
      imageBtnClose: json.global.moduleWebroot+'/public/images/lightbox/lightbox-btn-close.gif',
      imageBtnPrev: json.global.moduleWebroot+'/public/images/lightbox/lightbox-btn-prev.gif',
      imageBtnNext: json.global.moduleWebroot+'/public/images/lightbox/lightbox-btn-next.gif'
  });
}

$(document).ready(function() {
    json = $.parseJSON($('#jsonContent').html());
    midas.slicerappstore.renderCategory(json.extension.category);
    midas.slicerappstore.renderScreenshots(json.extension.screenshots);

    $('input.extensionActionButton')
        .attr('element', json.extension.slicerpackages_extension_id)
        .attr('extensionname', json.extension.productname);
    midas.slicerappstore.updateExtensionButtonState(json.extension.productname);

    if(json.slicerView) {
        createNotice = function() {}; //dummy function definition to prevent exceptions
    }

    $('#commentsDiv h4').remove();
    $('#ratingsDiv h4').remove();
    $('#ratingsUser').appendTo('#ratingsDiv');
    $('div.loginToRate').appendTo('#ratingsDiv');
    $('div.loginToRate').css('float', 'left');

    $('.googlePlus,.twitter,.facebook').qtip({
        content: {
            attr: 'qtip'
        },
        position: {
            at: 'bottom right',
            my: 'top left',
            viewport: $(window),
            effect: true
        }
    });

    var url = json.global.webroot+'/slicerappstore'
             + '?os=' + json.extension.os
             + '&arch=' + json.extension.arch
             + '&revision=' + json.extension.slicer_revision;
    if(json.slicerView) {
        url += '&slicerView';
    }
    $('#rootBreadcrumb').attr('href', url);
});
