import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import { createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import ImageViaUrlFormView from './ui/imageviaurlformview';
import ImageViaUrlEmbedEditing from './imageviaurlembedediting';
import imageUrlIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';

/**
 * The image-via-url embed UI plugin.
 *
 * @extends module:core/plugin~Plugin
 */
export default class ImageViaUrlEmbedUI extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [ ImageViaUrlEmbedEditing ];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'ImageViaUrlEmbedUI';
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;
    const command = editor.commands.get('imageViaUrlEmbed');
    // const registry = editor.plugins.get(ImageViaUrlEmbedEditing).registry;

    /**
     * The form view displayed inside the drop-down.
     *
     * @member {module:image-via-url-embed/ui/imageviaurlformview~MediaFormView}
     */
    this.form = new ImageViaUrlFormView(
      getFormValidators(editor.t),
      editor.locale
    );

    // Setup `imageUpload` button.
    editor.ui.componentFactory.add('imageViaUrlEmbed', locale => {
      const dropdown = createDropdown(locale);

      this._setUpDropdown(dropdown, this.form, command, editor);
      this._setUpForm(this.form, dropdown, command);

      return dropdown;
    });
  }

  _setUpDropdown(dropdown, form, command) {
    const editor = this.editor;
    const t = editor.t;
    const button = dropdown.buttonView;

    dropdown.bind('isEnabled').to(command);
    dropdown.panelView.children.add(form);

    button.set({
      label: t('插入链接图片'),
      icon: imageUrlIcon,
      tooltip: true
    });

    // Note: Use the low priority to make sure the following listener starts working after the
    // default action of the drop-down is executed (i.e. the panel showed up). Otherwise, the
    // invisible form/input cannot be focused/selected.
    button.on(
      'open',
      () => {
        // Make sure that each time the panel shows up, the URL field remains in sync with the value of
        // the command. If the user typed in the input, then canceled (`urlInputView#value` stays
        // unaltered) and re-opened it without changing the value of the image via url command (e.g. because they
        // didn't change the selection), they would see the old value instead of the actual value of the
        // command.
        form.url = command.value || '';
        form.urlInputView.select();
        form.focus();
      },
      { priority: 'low' }
    );

    dropdown.on('submit', () => {
      if (form.isValid()) {
        editor.execute('imageViaUrlEmbed', form.url);
        closeUI();
      }
    });

    dropdown.on('change:isOpen', () => form.resetFormStatus());
    dropdown.on('cancel', () => closeUI());

    function closeUI() {
      editor.editing.view.focus();
      dropdown.isOpen = false;
    }
  }

  _setUpForm(form, dropdown, command) {
    form.delegate('submit', 'cancel').to(dropdown);
    form.urlInputView.bind('value').to(command, 'value');

    // Form elements should be read-only when corresponding commands are disabled.
    form.urlInputView
      .bind('isReadOnly')
      .to(command, 'isEnabled', value => !value);
    form.saveButtonView.bind('isEnabled').to(command);
  }
}

function getFormValidators(t) {
  return [
    form => {
      if (!form.url.length) {
        return t('图片链接不能为空');
      }
    }
  ];
}
