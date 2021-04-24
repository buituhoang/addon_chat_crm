from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class AddonChatCRM(models.Model):
    _name = "crm.lead"
    _inherit = "crm.lead"

    def open_chat(self):
        # channel = self.env
        if not self.channel_id:
            self.channel_id = self.env['mail.channel'].sudo().create({
                'name': self.name,
                # # 'channel_last_seen_partner_ids': [(0, 0, {'partner_id': self.partner_id})],
                # 'channel_partner_ids': [(0, 0, {'partner_id': self.partner_id})]
            })
        print(self.channel_id)
        print(self.channel_id.channel_partner_ids.name)
        self.env['mail.channel'].channel_fold(self.channel_id.uuid)

    facebook_acc = fields.Char(string='Facebook')
    channel_id = fields.Many2one('mail.channel', 'Conversation', readonly=True)
