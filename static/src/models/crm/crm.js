odoo.define('addon_chat_crm.addon_chat_crm', function (require) {
    'use strict';

    const {registerNewModel} = require('mail/static/src/model/model_core.js');
    const {attr, many2one} = require('mail/static/src/model/model_field.js');

    function factory(dependencies) {
        class Crm extends dependencies['mail.model'] {
            //
            // static convertData(data) {
            //     const data2 = {};
            //     if ('id' in data) {
            //         data2.id = data.id;
            //     }
            //     if ('partner_id' in data) {
            //         if (!data.partner_id) {
            //             data2.partner = [['unlink']];
            //         } else {
            //             const partnerNameGet = data['partner_id'];
            //             const partnerData = {
            //                 display_name: partnerNameGet[1],
            //                 id: partnerNameGet[0],
            //             };
            //             data2.partner = [['insert', partnerData]];
            //         }
            //     }
            //     console.log(data2)
            //     return data2;
            // }
            //
            // static async performRpcRead({context, fields, ids}) {
            //     const crmsData = await this.env.services.rpc({
            //         model: 'crm.lead',
            //         method: 'read',
            //         args: [ids],
            //         kwargs: {
            //             context,
            //             fields,
            //         },
            //     });
            //     this.env.models['crm.lead'].insert(crmsData.map(crmData =>
            //         this.env.models['crm.lead'].convertData(crmData)
            //     ));
            // }
            //
            // async checkIsPartner() {
            //     return this.env.models['crm.lead'].performRpcRead({
            //         ids: [this.id],
            //         fields: ['partner_id'],
            //         context: {active_test: false},
            //     });
            // }
            //
            // async getChat() {
            //     if (!this.partner && !this.hasCheckedPartner) {
            //         await this.async(() => this.checkIsPartner());
            //     }
            //     console.log(this.partner)
            //     // prevent chatting with non-users
            //     if (!this.partner) {
            //         this.env.services['notification'].notify({
            //             message: this.env._t("You can only chat with employees that have a dedicated user."),
            //             type: 'info',
            //         });
            //         return;
            //     }
            //     return this.partner.getCrmChat();
            // }
            //
            // async openChat(options) {
            //     const chat = await this.async(() => this.getChat());
            //     if (!chat) {
            //         return;
            //     }
            //     await this.async(() => chat.open(options));
            //     return chat;
            // }
            //
            // async getCrmChat() {
            //     if (!this.partner) {
            //         // This user has been deleted from the server or never existed:
            //         // - Validity of id is not verified at insert.
            //         // - There is no bus notification in case of user delete from
            //         //   another tab or by another user.
            //         this.env.services['notification'].notify({
            //             message: this.env._t("You can only chat with existing users."),
            //             type: 'warning',
            //         });
            //         return;
            //     }
            //     // in other cases a chat would be valid, find it or try to create it
            //     let chat = this.env.models['mail.thread'].find(thread =>
            //         thread.channel_type === 'chat' &&
            //         thread.correspondent === this.partner &&
            //         thread.model === 'mail.channel' &&
            //         thread.public === 'private'
            //     );
            //     if (!chat || !chat.isPinned) {
            //         // if chat is not pinned then it has to be pinned client-side
            //         // and server-side, which is a side effect of following rpc
            //         chat = await this.async(() =>
            //             this.env.models['mail.thread'].performRpcCreateChat({
            //                 partnerIds: [this.partner.id],
            //             })
            //         );
            //     }
            //     if (!chat) {
            //         this.env.services['notification'].notify({
            //             message: this.env._t("An unexpected error occurred during the creation of the chat."),
            //             type: 'warning',
            //         });
            //         return;
            //     }
            //     return chat;
            // }

        }

        Crm.fields = {
            hasCheckedPartner: attr({
                default: false,
            }),
            id: attr(),
            partner: many2one('mail.partner'),
            // user: many2one('mail.user', {
            //     inverse: 'crm',
            // }),
        };

        Crm.modelName = 'crm.lead';

        return Crm;
    }

    registerNewModel('crm.lead', factory);

})
