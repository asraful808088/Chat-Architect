interface OptionItemIntence {
  checked: boolean;
}
interface OptionType {
  FWG: OptionItemIntence;
  WGFA: OptionItemIntence;
  PWGS: OptionItemIntence;
  PBRP: OptionItemIntence;
  CSA: OptionItemIntence;
  WSAIS: OptionItemIntence;
}

function createDefaultOptions(): OptionType {
  return {
    FWG: {
      checked: true,
      generateQuantity: 20,
      tryToGenerateQuantity: 50000,
      WrongThreshold: 0.92,
    },
    WGFA: {
      checked: true,
      generateQuantity: 20,
      tryToGenerateQuantity: 50000,
      startWrongThreshold: 0.92,
      endWrongThreshold: 0.92,
    },
    FLWG: {
      checked: true,
      generateQuantity: 20,
      tryToGenerateQuantity: 50000,
      WrongThreshold: 0.75,
    },
    letterProcess:{checked: true, uppercase: true, lowercase: true, capitalize: true},
    PWGS: { checked: true,items:[] },
    PBRP: {
      checked: true,
      default: {
        set: true,
      },
      custom: {
        set: false,
        items: [],
      },
    },
    CSA: { checked: true },
    WSAIS: { checked: true },
  };
}

function defaultCreateData() {
  return {};
}

export { OptionType, createDefaultOptions };
