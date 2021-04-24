odoo.define('addon_chat_crm.chat', function (require) {
'use strict';
    var viewRegistry = require('web.view_registry');

    var FormController = require('web.FormController');
    var FormView = require('web.FormView');
    var FormRenderer = require('web.FormRenderer');

    var KanbanController = require('web.KanbanController');
    var KanbanView = require('web.KanbanView');
    var KanbanRenderer = require('web.KanbanRenderer');
    var KanbanRecord = require('web.KanbanRecord');

    const { Component } = owl;

    // CHAT MIXIN
    var ChatMixin = {
        /**
         * @override
         */
        _render: function () {
            var self = this;
            return this._super.apply(this, arguments).then(function () {
                var $chat_button = self.$el.find('.o_crm_chat_btn');
                $chat_button.off('click').on('click', self._onOpenChat.bind(self));
            });
        },

        destroy: function () {
            if (this.$el) {
                this.$el.find('.o_crm_chat_btn').off('click');
            }
            return this._super();
        },

        _onOpenChat: function (ev) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            const env = Component.env;
            env.messaging.openChat({ crmID: this.state.data.id });
            return true;
        },
    };

    // USAGE OF CHAT MIXIN IN FORM VIEWS
    var CrmFormRenderer = FormRenderer.extend(ChatMixin);

    var CrmFormView = FormView.extend({
        config: _.extend({}, FormView.prototype.config, {
            Controller: FormController,
            Renderer: CrmFormRenderer
        }),
    });

    viewRegistry.add('crm_form', CrmFormView);

    // USAGE OF CHAT MIXIN IN KANBAN VIEWS
    var CrmKanbanRecord = KanbanRecord.extend(ChatMixin);

    var CrmKanbanRenderer = KanbanRenderer.extend({
        config: Object.assign({}, KanbanRenderer.prototype.config, {
            KanbanRecord: CrmKanbanRecord,
        }),
    });

    var CrmKanbanView = KanbanView.extend({
        config: _.extend({}, KanbanView.prototype.config, {
            Controller: KanbanController,
            Renderer: CrmKanbanRenderer
        }),
    });

    viewRegistry.add('crm_kanban_view', CrmKanbanView);
});
