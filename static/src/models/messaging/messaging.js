odoo.define('addon_chat_crm/static/src/models/messaging/messaging.js', function (require) {
'use strict';

const {
    registerInstancePatchModel,
} = require('mail/static/src/model/model_core.js');

registerInstancePatchModel('mail.messaging', 'addon_chat_crm/static/src/models/messaging/messaging.js', {
    //--------------------------------------------------------------------------
    // Public
    //--------------------------------------------------------------------------

    /**
     * @override
     * @param {integer} [param0.employeeId]
     */
    async getChat({ crmID }) {
        if (crmID) {
            const employee = this.env.models['crm.lead'].insert({ id: crmID });
            return employee.getChat();
        }
        return this._super(...arguments);
    },
    // /**
    //  * @override
    //  */
    // async openProfile({ id, model }) {
    //     if (model === 'hr.employee' || model === 'hr.employee.public') {
    //         const employee = this.env.models['hr.employee'].insert({ id });
    //         return employee.openProfile();
    //     }
    //     return this._super(...arguments);
    // },
});

});
