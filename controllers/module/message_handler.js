require('dotenv').config({path: '/'})

const express = require('express');
const bodyParser = require('body-parser');
const qs = require('querystring');
const dialogs = require('./dialog.js');
const prompts = require('./prompt.js');
const action = require('./action');
const user = require('./user');


var Botkit = require('botkit');

var os = require('os');


module.exports = {
  handle: function (req,res) {
    var payload = JSON.parse(req.body.payload);
    var callback_id = payload.callback_id;
    const token = payload.token;
    const trigger_id = payload.trigger_id;
    // var value = JSON.parse(payload.action)
    if (token === process.env.SLACK_VERIFICATION_TOKEN)
    {
        //onsole.log(payload.actions[0].value)
        if (callback_id == 'add_course_prompt' ){
            if(payload.actions[0].value == 'yes'){
                console.log("I am here!!!!")
                const dialog =
                {
                    token: process.env.slackToken,
                    trigger_id,
                    dialog: JSON.stringify(dialogs.add_review_dialog),
                }
                action.open_dialog(dialog, res);
            }
            else{
                action.send_message(payload.channel.id, 'Alrighty boy!', []);
            }
        } 
        else if (callback_id == 'add_review_dialog')
        {
            // TODO Store review and rating into database
            //UserModel.give_review(payload);
            console.log(payload)
            action.send_message(payload.channel.id, payload.submission.name + " has been added", []);
            res.send('');

        }
        else
        {
            console.log('Reached idhar');
            // console.log(payload);
        }
    }
    else
    {

        debug('Verification token mismatch');
        console.log('Failed Here');
        res.sendStatus(403);
    }
  }
}