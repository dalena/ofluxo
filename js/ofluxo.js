function load_webgl(){
	"use strict"

	// register the application module
	b4w.register("ofluxo", function(exports, require) {

		// import modules used by the app
		var m_app       = require("app");
		var m_data      = require("data");
		var m_cont			= require("container");
		var m_preloader = require("preloader");
		var m_scene			= require("scenes");
		var m_cam			= require("camera");
		var m_ctl	  		= require("controls");
		var PRELOADING = true;

		var camera;
		var input_in_progress = false;
		var main_seed = 0;
		var shake_seed = 0;

		/**
		* export the method to initialize the app (called at the bottom of this file)
		*/
		exports.init = function() {
			m_app.init({
				canvas_container_id: "main_canvas_container",
				callback: init_cb,
				show_fps: false,
				console_verbose: false,
				autoresize: true
			});
		}

		/**
		* callback executed when the app is initialized
		*/
		function init_cb(canvas_elem, success) {

			if (!success) {
				return;
			}

			m_preloader.create_simple_preloader({
				bg_color: "#00000",
				bar_color: "#ffffff",
				background_container_id: "background_image_container",
				canvas_container_id: "main_canvas_container"
			});

			load();
		}

		/**
		* load the scene data
		*/
		function load() {
			var p_cb = PRELOADING ? preloader_callback : null;
			m_data.load("ofluxo.json", load_cb, p_cb, !true);
		}

		/**
		* callback executed when the scene is loaded
		*/
		function load_cb(data_id) {
			m_app.enable_camera_controls();
			var canvas_elem = m_cont.get_canvas();

			canvas_elem.addEventListener("mouseup", function(e) {
				$("#control-message").hide();
			}, false);

			window.addEventListener("keydown", function(e){
				if(e.keyCode === 87  || e.keyCode === 83 || e.keyCode === 65 ||
					e.keyCode === 68 ||  e.keyCode === 38 ||  e.keyCode === 40 ||
					e.keyCode === 37 ||   e.keyCode === 39 && document.activeElement !== 'text') {
						$("#control-message").hide();
					}
					if(e.keyCode === 72 && document.activeElement !== 'text') {
						$("#control-message").show();
					}
				});


				$( "#to_be_replaced" ).replaceWith(playerFrame);
				camera = m_scene.get_active_camera();
				setup_scene();
			}

			function preloader_callback(percentage) {
				m_preloader.update_preloader(percentage);
			}

			function setup_scene() {

				var elapsed = m_ctl.create_timeline_sensor();
				var sens_array = [elapsed];

				var logic = function(s) {return (s[0])};

				function rotate_cb(obj, id, pulse) {
					if (input_in_progress == false){
						var seed1 = Math.random()*main_seed + 0.001;
						var seed2 = Math.random()*main_seed - 0.001;
						var angle1 = Math.sin(seed1)*0.002;
						var angle2 = Math.cos(seed2)*0.002;
						m_cam.target_rotate(camera, angle1, angle2, false, false);
					}
				}
				m_ctl.create_sensor_manifold(camera, "ANIM", m_ctl.CT_CONTINUOUS,sens_array, logic, rotate_cb);
			}
		});

		// import the app module and start the app by calling the init method
		b4w.require("ofluxo").init();
	}
