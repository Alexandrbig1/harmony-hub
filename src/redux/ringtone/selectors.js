// redux/ringtone/selectors.js
export const selectIsGenerating = state => state.ringtone.isGenerating;
export const selectGeneratedUrl = state => state.ringtone.generatedUrl;
export const selectRingtoneError = state => state.ringtone.error;