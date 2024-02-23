use chrono::Local;
use tracing_subscriber::filter::{EnvFilter, LevelFilter};
use lambda_runtime::{run, service_fn, Error, LambdaEvent};
use serde_json::{json, Value};


/// This is the main body for the function.
/// Write your code inside it.
/// There are some code example in the following URLs:
/// - https://github.com/awslabs/aws-lambda-rust-runtime/tree/main/examples
/// - https://github.com/aws-samples/serverless-rust-demo/
async fn function_handler(event: LambdaEvent<Value>) -> Result<Value, Error> {
    // Extract some useful information from the request
    println!("{:?}", event.payload);

    let datetime = Local::now().to_rfc3339();

    let field_name = event.payload["info"]["fieldName"].to_owned();

    if field_name == json!("addDemo") {

        let id = match &event.payload["arguments"]["input"]["id"].is_string() {
            true => event.payload["arguments"]["input"]["id"].as_str(),
            false => Some("1")
        };

        let description = &event.payload["arguments"]["input"]["description"];


        if !description.is_string() {
            panic!("description is not provided")
        }


        let return_val = json!({
            "id": id.unwrap_or("1"),
            "description": description,
            "datetime": datetime
        });

        return Ok(return_val)

    }

    let return_val = json!({
            "id": "1".to_string(),
            "description": "default description".to_string(),
            "datetime": datetime
        });


    Ok(return_val)
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_env_filter(
            EnvFilter::builder()
                .with_default_directive(LevelFilter::INFO.into())
                .from_env_lossy(),
        )
        // disable printing the name of the module in every log line.
        .with_target(false)
        // disabling time is handy because CloudWatch will add the ingestion time.
        .without_time()
        .init();

    run(service_fn(function_handler)).await
}
