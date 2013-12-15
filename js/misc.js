$.fn.socialSharePrivacy.settings.order = ['facebook', 'twitter', 'gplus'];
$.fn.socialSharePrivacy.settings.path_prefix = '';
$.fn.socialSharePrivacy.settings.info_link_target = '_blank';

// Initialize the privacy-friendly sharing buttons.
$(document).ready(function() {
    $('.share').socialSharePrivacy();
});

$('#signup-notice').affix({
  offset: {
    top: 200
  }
});
