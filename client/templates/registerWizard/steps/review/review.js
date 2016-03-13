Template.wizardReview.onCreated(function () {
  // Get reference to template instance
  const instance = this;

  // Get form data as instance variable
  instance.registration = instance.data.wizard.mergedData();
});

Template.wizardReview.events({
  'click .wizard-back-button': function (event, instance) {
    // Go to previous wizard step
    instance.data.wizard.previous();
  }
});

Template.wizardReview.helpers({
  'registration': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get registration from template instance
    return instance.registration;
  },
  'accommodationsFee': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get registration data
    const registration = instance.registration;

    // Adjust attributes of registration data to match accommodations fee function
    registration.type = registration.registrationType;
    registration.ageGroup = calculateAgeGroup(registration.age);

    // Calculate accommodations fee
    const accommodationsFee = calculateAccommodationsFee(registration);

    return accommodationsFee;
  },
  'linensFee': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get registration from template instance
    const registration = instance.registration;

    // Check if linens are needed
    if (registration.linens) {
      // If so, return linens fee
      return linensFee;
    }
  },
  'firstTimeAttenderDiscount': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get registration
    const registration = instance.registration;

    // Calculate first time attender discount
    if (registration.firstTimeAttender) {
      return firstTimeAttenderDiscount;
    }
  },
  'halfDayDiscount': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get registration from template instance
    const registration = instance.registration;

    // Get registration days
    const days = registration.days;

    // Check if there are any days
    if (days) {
      // If so, count the number of discount days
      const discountDaysDiscount = calculateDiscountDaysDiscount(registration);

      // Return the calculated half day discount
      return discountDaysDiscount;
    }
  },
  'subtotal': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get registration from template instance
    const registration = instance.registration;

    // Adjust attributes of registration data to match accommodations fee function
    registration.type = registration.registrationType;
    registration.ageGroup = calculateAgeGroup(registration.age);

    // Calculate registration fee
    const subtotal = calculateRegistrationSubtotal(registration);

    return subtotal;
  },
  'lateFee': function () {
    // Check if current date is past registration deadline
    if (moment().utc() > moment(lateRegistrationBegins).utc()) {
      // If so, calculate late fee

      // Get reference to template instance
      const instance = Template.instance();

      // Get registration from template instance
      const registration = instance.registration;

      // Adjust attributes of registration data to match accommodations fee function
      registration.type = registration.registrationType;
      registration.ageGroup = calculateAgeGroup(registration.age);

      // Calculate registration fee
      const registrationSubtotal = calculateRegistrationSubtotal(registration);

      // Calculate late fee
      const lateFee = registrationSubtotal * earlyDiscountOrLateFeePercentage;

      return lateFee;
    }

  },
  'registrationFee': function () {
    // Get reference to template instance
    const instance = Template.instance();

    // Get registration from template instance
    const registration = instance.registration;

    // Adjust attributes of registration data to match accommodations fee function
    registration.type = registration.registrationType;
    registration.ageGroup = calculateAgeGroup(registration.age);

    // Calculate registration fee
    const registrationFee = calculateRegistrationPrice(registration);

    return registrationFee;
  }
});
