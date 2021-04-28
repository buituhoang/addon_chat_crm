from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class AddonChatCRM(models.Model):
    _name = "crm.lead"
    _inherit = "crm.lead"

    def open_chat(self):
        if self.channel_id:
            channel = self.env['mail.channel'].sudo().search([('id', '=', self.channel_id.id)])
            if channel:
                channel.channel_fold(channel.uuid)
            else:
                new_channel = self.env['mail.channel'].sudo().create({
                    'name': self.name,
                })
                self.write({'channel_id': new_channel.id})
                self.channel_id.channel_fold(self.channel_id.uuid)
        if not self.channel_id:
            self.channel_id = self.env['mail.channel'].sudo().create({
                'name': self.name,
                # # 'channel_last_seen_partner_ids': [(0, 0, {'partner_id': self.partner_id})],
                # 'channel_partner_ids': [(0, 0, {'partner_id': self.partner_id})]
            })
            self.channel_id.channel_fold(self.channel_id.uuid)
        print(self.channel_id)
        print(self.channel_id.channel_partner_ids.name)

    facebook_acc = fields.Char(string='Facebook')
    channel_id = fields.Many2one('mail.channel', 'Conversation', readonly=True)
