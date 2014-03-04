require 'cocaine'
require 'fileutils'

def convert
  chdir 'public'
  chdir '808-sample-pack'

  all_folder_names = get_all_folder_names

  all_folder_names.each do |folder_name|

    chdir folder_name

    all_aif_names = get_all_aif_names
    all_aif_names.each do |aif_name|
      mp3_name = make_mp3_name aif_name
      convert_file(aif_name, mp3_name)
    end

    chdir '..'
  end
end

def chdir dir
  Dir.chdir(dir)
end

def get_all_folder_names
  Dir.glob('*').select { |f| File.directory?(f) }
end

def get_all_aif_names
  Dir.glob('*.aif')
end

def make_mp3_name aif_name
  aif_name.gsub(' ', '-').downcase.chop.chop.chop + 'mp3'
end

def convert_file aif_name, mp3_name
  unless file_exists? mp3_name
    command = Cocaine::CommandLine.new('sox', "#{aif_name.gsub(' ', '\ ')} #{mp3_name}")
    p command.command
    command.run
  end
end

def file_exists? file_name
  File.exists? file_name
end

convert