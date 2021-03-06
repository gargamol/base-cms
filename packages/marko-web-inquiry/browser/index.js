const DefaultForm = () => import(/* webpackChunkName: "inquiry-default-form" */ './default-form.vue');

export default (Browser, { component, mountPoint } = {}) => {
  const InquiryForm = component || DefaultForm;
  const { EventBus } = Browser;
  Browser.register('InquiryForm', InquiryForm, {
    provide: { EventBus },
    mountPoint,
  });
};
